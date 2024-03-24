using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryOOP
{
    internal class Author
    {
        public string Name { get; set; }
        public string Nationality { get; set; }

        public Author(string name, string nationality)
        {
            Name = name;
            Nationality = nationality;
        }


    }
}
