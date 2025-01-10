
export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl">Page Not Found</p>
        <p className="text-muted-foreground">
          We could not find the page you&apos;re looking for.
        </p>
      </div>
    </div>
  )
}
