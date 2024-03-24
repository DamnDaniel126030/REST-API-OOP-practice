using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryOOP
{
    internal class Book
    {
        public string Title { get; set; }
        public string Genre { get; set; }
        public Author Author { get; set; }

        public Book(string title, string genre, Author author)
        {
            Title = title;
            Genre = genre;
            Author = author;
        }

        public override string ToString()
        {
            return $"Könyv címe: {Title}  -  Műfaja: {Genre}  -  Szerzője: {Author.Name}   -   Szerző nemzetisége: {Author.Nationality}";
        }

    }
}
