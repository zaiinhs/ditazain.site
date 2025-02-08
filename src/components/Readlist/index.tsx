import { ArrowUpRight, BookOpen, Clock, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const readingList = [
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    description:
      "A guide to becoming a better programmer through practical examples and timeless advice.",
    coverImage: "/logo.webp",
    link: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/",
    rating: 5,
    readTime: "15 min read",
    category: "Software Development",
    status: "Currently Reading",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    description:
      "A handbook of agile software craftsmanship that helps developers write better, more maintainable code.",
    coverImage: "/logo.webp",
    link: "https://www.oreilly.com/library/view/clean-code-a/9780136083238/",
    rating: 4.5,
    readTime: "20 min read",
    category: "Best Practices",
    status: "Completed",
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    description:
      "Elements of Reusable Object-Oriented Software - A foundational book on software design patterns.",
    coverImage: "/logo.webp",
    link: "https://www.oreilly.com/library/view/design-patterns-elements/0201633612/",
    rating: 5,
    readTime: "25 min read",
    category: "Software Architecture",
    status: "Want to Read",
  },
  {
    title: "Refactoring",
    author: "Martin Fowler",
    description:
      "Improving the design of existing code through systematic refactoring techniques.",
    coverImage: "/logo.webp",
    link: "https://martinfowler.com/books/refactoring.html",
    rating: 4.8,
    readTime: "18 min read",
    category: "Code Quality",
    status: "Completed",
  },
];

export default function Readlist() {
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      );
    }

    return stars;
  };

  return (
    <section className="w-full">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">
          Reading List
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          A curated collection of books and articles that have shaped my
          knowledge and perspective.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {readingList.map((book, index) => (
          <Link
            href={book.link}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <article className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="p-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-32 h-48 relative rounded-lg overflow-hidden">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h2 className="text-xl font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                          {book.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          by {book.author}
                        </p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {book.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        {renderRatingStars(book.rating)}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{book.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-sm">{book.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          book.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : book.status === "Currently Reading"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {book.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
