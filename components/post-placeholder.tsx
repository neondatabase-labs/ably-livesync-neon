import CommentPlaceholder from './comment-placeholder'

export default function () {
  return (
    <main className="mt-8 relative flex flex-col">
      <div className="w-full divide-y divide-gray-900/5 gap-y-8">
        {[...Array(3)].map((_, i) => (
          <CommentPlaceholder key={i} />
        ))}
      </div>
    </main>
  )
}
