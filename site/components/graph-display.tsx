import {
  ImageConnectionEdge,
  useConnectionGraphQuery,
} from "@/lib/__generated__/graphql"
import { Flex } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React from "react"

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
})

export type GraphDisplayProps = {
  slug: string
  width: number
  currentPersonIds?: number[]
}

// preventing SWR revalidation from re-rendering the component with memo
export const GraphDisplay = React.memo(
  ({ slug, width, currentPersonIds = [] }: GraphDisplayProps) => {
    const router = useRouter()
    const isLoneGraph = currentPersonIds.length === 0
    const { data: graph, refetch: fetchGraph } = useConnectionGraphQuery(
      {
        slug,
      },
      { enabled: false }
    )
    React.useEffect(() => {
      fetchGraph()
    }, [])
    function nodePaint(opts: any, ctx) {
      const { id, x, y, name } = opts
      ctx.fillStyle = opts.color
      function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
        var rot = (Math.PI / 2) * 3
        var x = cx
        var y = cy
        var step = Math.PI / spikes

        ctx.beginPath()
        ctx.moveTo(cx, cy - outerRadius)
        for (let i = 0; i < spikes; i++) {
          x = cx + Math.cos(rot) * outerRadius
          y = cy + Math.sin(rot) * outerRadius
          ctx.lineTo(x, y)
          rot += step

          x = cx + Math.cos(rot) * innerRadius
          y = cy + Math.sin(rot) * innerRadius
          ctx.lineTo(x, y)
          rot += step
        }
        ctx.lineTo(cx, cy - outerRadius)
        ctx.closePath()
        ctx.lineWidth = 5
        ctx.strokeStyle = opts.color
        ctx.stroke()
        ctx.fill()
      }

      if (name === "This image") {
        if (isLoneGraph) {
          ctx.fillStyle = "#eeeeee"
          ctx.font = "5px Inter"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText("There's nobody in this image 😭", x, y + 20)
          ctx.fillStyle = opts.color
        } else {
          ctx.fillStyle = "#eeeeee"
          ctx.font = "5px Inter"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText("This image", x, y + 10)
          ctx.fillStyle = opts.color
        }
        drawStar(opts.x, opts.y, 5, 2, 1)
      } else if (name === "Another image") {
        ctx.beginPath()
        ctx.fillStyle = "#13131d"
        ctx.arc(x, y, 5, 0, 2 * Math.PI, false)
        ctx.fill()
        ctx.fillStyle = "#eeeeee"
        ctx.font = "2px Inter"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("Image", x, y)
        ctx.fillStyle = opts.color
      } else {
        ctx.fillStyle = "#eeeeee"
        ctx.font = "5px Inter"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(name, x, y)
      }
    }
    if (!graph) {
      return null
    }
    return (
      <Flex
        m="auto"
        borderRadius="lg"
        overflow="hidden"
        borderColor="gray.800"
        borderWidth="1px"
      >
        <ForceGraph2D
          backgroundColor="#0a0a10"
          linkDirectionalArrowLength={1.5}
          linkDirectionalArrowRelPos={0.95}
          width={width}
          height={width * 0.5}
          nodeLabel="name"
          linkColor={(r) => `#9898a0`}
          onNodeClick={(node) => {
            if ("imageSlug" in node) {
              router.push(`/image/${(node as any).imageSlug}`)
            }
          }}
          nodeAutoColorBy={(node: any) => {
            if ("imageSlug" in node && node.imageSlug !== slug) {
              return "image"
            } else if ("imageSlug" in node && node.imageSlug === slug) {
              return "base"
            }
            if ("personId" in node) {
              return String(currentPersonIds.includes(node.personId))
            } else {
              throw Error("Image did not have parsonId or id")
            }
          }}
          enableNodeDrag={true}
          nodeCanvasObject={(node, ctx) => nodePaint(node, ctx)}
          nodePointerAreaPaint={(a, _, c) => nodePaint(a, c)}
          graphData={{
            links:
              graph.imageConnections?.edges.map((edge) => ({
                source:
                  edge.type === ImageConnectionEdge.ImageToPerson
                    ? `image-${edge.from}`
                    : `person-${edge.from}`,
                target:
                  edge.type === ImageConnectionEdge.ImageToPerson
                    ? `person-${edge.to}`
                    : `image-${edge.to}`,
              })) ?? [],
            nodes:
              graph.imageConnections?.images
                .map((r) => ({
                  currentImage: r.slug === slug,
                  imageSlug: r.slug,
                  id: `image-${r.id}`,
                  name: r.slug === slug ? "This image" : `Another image`,
                }))
                .concat(
                  (graph.imageConnections.people ?? []).map((r) => ({
                    personId: r.id,
                    id: `person-${r.id}`,
                    name: r.name,
                  })) as any[]
                ) ?? [],
          }}
        />
      </Flex>
    )
  }
)
