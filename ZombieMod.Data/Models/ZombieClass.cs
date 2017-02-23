namespace ZombieMod.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations.Schema;

    public class ZombieClass
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The name of the class
        /// </summary>
        public String Name { get; set; }

        /// <summary>
        /// The base power
        /// </summary>
        public float BasePower { get; set; }

        [NotMapped]
        public string Info
        {
            get
            {
                return this.ToString();
            }
        }

        public override string ToString()
        {
            return string.Format("Class {0} | Name: {1}, Base Power: {2}", Id, Name, BasePower);
        }
    }
}
