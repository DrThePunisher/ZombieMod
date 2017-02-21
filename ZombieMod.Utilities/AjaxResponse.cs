namespace ZombieMod.Utilities
{
    public class AjaxResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }

        public AjaxResponse()
        {
            Success = true;
            Message = "Success";
        }
    }
}
