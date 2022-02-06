import * as client from "prom-client"

export default function makeMetrics() {
  return {
    client,
  }
}

export type MetricsService = ReturnType<typeof makeMetrics>
