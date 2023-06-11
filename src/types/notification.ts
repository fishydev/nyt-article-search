export type Notification = {
  id: string
  type: "success" | "error" | "info" | "warning"
  duration: number
  text: string
}
