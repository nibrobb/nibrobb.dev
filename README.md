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
  --build-arg PUBLIC_BASE_DOMAIN=nibrobb.dev \
  --build-arg PUBLIC_GTAG_ID=... \
  --build-arg PUBLIC_SLACK_REDIRECT_URI=... .

docker run -p 3000:3000 -e GITHUB_TOKEN=... -e SLACK_CLIENT_ID=... -e SLACK_CLIENT_SECRET=... \
  ghcr.io/nibrobb/nibrobb.dev:latest
```

`PUBLIC_*` variables are inlined at build time; the private ones are read at runtime.

## Kubernetes

The Helm chart lives in `charts/nibrobb-dev`, and `deploy/argocd-application.yaml` is an Argo CD
`Application` for it. Create the runtime secret before syncing:

```bash
kubectl create namespace nibrobb-dev
kubectl -n nibrobb-dev create secret generic nibrobb-dev-secrets \
  --from-literal=GITHUB_TOKEN=... \
  --from-literal=SLACK_CLIENT_ID=... \
  --from-literal=SLACK_CLIENT_SECRET=...
kubectl apply -f deploy/argocd-application.yaml
```
