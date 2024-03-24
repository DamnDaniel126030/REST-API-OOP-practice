using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace LibraryOOP
{
    
    internal class FileManager
    {
        static List<Book> books = new List<Book>();
        public List<Book> ReadBooksFromFile(string filename)
        {
            try
            {
                StreamReader file = new StreamReader(filename);
                while (!file.EndOfStream)
                {
                    string line = file.ReadLine();
                    string[] properties = line.Split(';');
                    books.Add(new Book(properties[0], properties[1], new Author(properties[2], properties[3])));
                }
                return books;
            }
            catch (FileNotFoundException ex)
            {
                Console.WriteLine("A fájl nem található");
                Console.WriteLine(ex.ToString());
                return books;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return books;
            }
        }
    }
}
