namespace ZombieMod.Utilities
{
    public class AjaxResponse
    {
        /// <summary>
        /// Represents if the request was successful
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// Information about the request
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// The data being included in the response
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// Basic constructor
        /// </summary>
        public AjaxResponse()
        {
            Success = true;
            Message = "Success";
        }
    }
}
