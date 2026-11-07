# nibrobb.dev

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

```bash
pnpm run build
```

## Docker

```bash
docker build -t ghcr.io/nibrobb/nibrobb.dev:latest \
  --build-arg PUBLIC_GTAG_ID=... .

docker run -p 3000:3000 \
  -e GITHUB_TOKEN=... -e SLACK_CLIENT_ID=... -e SLACK_CLIENT_SECRET=... \
  -e BASE_DOMAIN=http://localhost:3000 -e SLACK_REDIRECT_URI=http://localhost:3000/oauth/slack/callback \
  ghcr.io/nibrobb/nibrobb.dev:latest
```

`PUBLIC_GTAG_ID` is inlined at build time. Everything else (`GITHUB_TOKEN`, `SLACK_*`, `BASE_DOMAIN`,
`SLACK_REDIRECT_URI`) is read at runtime, so one image works in every environment. See `.env.template`.
The Slack redirect URI must also be registered in the Slack app settings.

## Kubernetes

The Helm chart lives in `charts/nibrobb-dev`. Each environment has a values file in that directory.
An Argo CD `ApplicationSet` creates one Application per values file it's given. The ApplicationSet template
is shared in `deploy/base/applicationset.yaml`, and two Kustomize overlays select which environments
each cluster gets:

| Overlay               | Values files                                           | Applications created                                   | Typical cluster |
| --------------------- | ------------------------------------------------------ | ------------------------------------------------------ | --------------- |
| `deploy/minikube`     | `values-minikube.yaml`, `values-minikube-staging.yaml` | `nibrobb-dev-minikube`, `nibrobb-dev-minikube-staging` | local minikube  |
| `deploy/prod-staging` | `values-prod.yaml`, `values-staging.yaml`              | `nibrobb-dev-prod`, `nibrobb-dev-staging`              | production k8s  |

Each Application deploys to namespace `nibrobb-dev-<env>`.

**Revisions**

- Prod tracks the git tag `v<image.tag>` from `values-prod.yaml`. Bump that tag with each release.
- Every other environment tracks `HEAD` of `main` on GitHub. Minikube therefore runs what's pushed, not your
  local working tree.

**Images** (`.github/workflows/docker-publish.yaml`, pushed to `ghcr.io/nibrobb/nibrobb.dev`)

| Event                 | Tags produced          | Used by                                      |
| --------------------- | ---------------------- | -------------------------------------------- |
| push to `main` (code) | `main`, `sha-<short>`  | staging, minikube, minikube-staging          |
| push of tag `vX.Y.Z`  | `X.Y.Z`, `sha-<short>` | prod (via `image.tag` in `values-prod.yaml`) |

Chart-only and docs-only commits don't build an image. `workflow_dispatch` also runs the build manually.

**Release flow (prod)**

1. Tag the release on `main`: `git tag v0.2.0 && git push origin v0.2.0`. This builds `ghcr.io/nibrobb/nibrobb.dev:0.2.0`.
2. Set `image.tag: "0.2.0"` in `charts/nibrobb-dev/values-prod.yaml` on `main`. Argo CD then deploys git tag `v0.2.0` to prod.

**Staging and minikube** deploy git `HEAD` and follow the `main` image by digest, using
[Argo CD Image Updater](https://argocd-image-updater.readthedocs.io/):

1. A push to `main` rebuilds `ghcr.io/nibrobb/nibrobb.dev:main`, which gives it a new digest.
2. The `ImageUpdater` resource in `deploy/base/imageupdater.yaml` sees that digest. It writes
   `image.digest=sha256:...` into the Helm parameters of every `nibrobb-dev-*` Application whose `nibrobb.dev/environment`
   label isn't `prod`. All Image Updater config lives in that resource; the Applications carry no annotations.
3. The chart renders `repository@digest`, so the pod spec changes and Argo CD rolls the Deployment.

The selector excludes prod, so it stays on its release tag. The ApplicationSet ignores
`/spec/source/helm/parameters` so it doesn't undo what Image Updater writes. Those parameters live only in
the cluster, not in git. Recreating the Application resets it to the plain `main` tag until the next digest check.

Install Image Updater once per cluster, in the `argocd` namespace. The manifest includes the `ImageUpdater` CRD:

```bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-image-updater/v1.4.0/config/install.yaml
```

**Local (minikube)**

```bash
kubectl create namespace nibrobb-dev-minikube
kubectl -n nibrobb-dev-minikube create secret generic nibrobb-dev-secrets \
  --from-literal=GITHUB_TOKEN=... --from-literal=SLACK_CLIENT_ID=... --from-literal=SLACK_CLIENT_SECRET=...
kubectl apply -k deploy/minikube
```

**Production cluster** (prod and staging)

```bash
for ns in nibrobb-dev-prod nibrobb-dev-staging; do
  kubectl create namespace "$ns"
  kubectl -n "$ns" create secret generic nibrobb-dev-secrets \
    --from-literal=GITHUB_TOKEN=... --from-literal=SLACK_CLIENT_ID=... --from-literal=SLACK_CLIENT_SECRET=...
done
kubectl apply -k deploy/prod-staging
```

Both overlays include the `ImageUpdater` resource, so install Image Updater (above) before running
`kubectl apply -k`, or the apply fails on the missing CRD.

Argo CD creates the Applications, and `CreateNamespace=true` is set, so the secrets above need to exist before
the pods start. Create them before applying the overlay, or the pods will wait on a missing Secret.
