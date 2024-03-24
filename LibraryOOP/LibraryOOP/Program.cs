using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace LibraryOOP
{
    internal class Program
    {
        static void Main(string[] args)
        {
            FileManager filemanager = new FileManager();
            List<Book> books = filemanager.ReadBooksFromFile("konyvek.txt");

            foreach (Book book in books)
            {
                Console.WriteLine(book.ToString());
            }
        }
    }
}
