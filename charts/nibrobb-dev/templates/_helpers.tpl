{{- define "nibrobb-dev.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "nibrobb-dev.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{- define "nibrobb-dev.labels" -}}
helm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" }}
{{ include "nibrobb-dev.selectorLabels" . }}
app.kubernetes.io/version: {{ .Values.image.tag | default .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "nibrobb-dev.selectorLabels" -}}
app.kubernetes.io/name: {{ include "nibrobb-dev.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{- define "nibrobb-dev.secretName" -}}
{{- .Values.secrets.existingSecret | default (include "nibrobb-dev.fullname" .) }}
{{- end }}

{{- define "nibrobb-dev.origin" -}}
{{- if .Values.origin }}
{{- .Values.origin }}
{{- else if and .Values.ingress.enabled .Values.ingress.hosts }}
{{- printf "https://%s" (first .Values.ingress.hosts).host }}
{{- end }}
{{- end }}
