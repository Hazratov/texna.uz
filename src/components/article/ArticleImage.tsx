interface ArticleImageProps {
  image: string;
  title: string;
}

export function ArticleImage({ image, title }: ArticleImageProps) {
  return (
    <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
  );
}