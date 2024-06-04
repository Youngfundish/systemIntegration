using Microsoft.AspNetCore.Mvc;

namespace SecondServerParser.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FormatController : ControllerBase
    {

        private readonly HttpClient client;

        public FormatController(HttpClient _client)
        {
            client = _client;
            client.BaseAddress = new Uri("http://localhost:3000");
        }

        [HttpGet("get-xml")]
        public async Task<IActionResult> GetXMLAsync()
        {
            // Make a GET request to the desired endpoint
            HttpResponseMessage response = await client.GetAsync("/xml");

            // Check if the request was successful
            if (response.IsSuccessStatusCode)
            {
                // Read the content as a string
                string content = await response.Content.ReadAsStringAsync();

                // Return the XML content
                return Content(content, "application/json");
            }
            else
            {
                // If the request was not successful, return an appropriate error response
                return StatusCode((int)response.StatusCode, "Failed to retrieve XML data.");
            }
        }
        [HttpGet("get-yaml")]
        public async Task<IActionResult> GetYamlAsync()
        {
            // Make a GET request to the desired endpoint
            HttpResponseMessage response = await client.GetAsync("/yaml");

            // Check if the request was successful
            if (response.IsSuccessStatusCode)
            {
                // Read the content as a string
                string content = await response.Content.ReadAsStringAsync();

                // Return the Yaml content
                return Content(content, "application/json");
            }
            else
            {
                // If the request was not successful, return an appropriate error response
                return StatusCode((int)response.StatusCode, "Failed to retrieve XML data.");
            }
        }
        [HttpGet("get-csv")]
        public async Task<IActionResult> GetCSVAsync()
        {
            // Make a GET request to the desired endpoint
            HttpResponseMessage response = await client.GetAsync("/csv");

            // Check if the request was successful
            if (response.IsSuccessStatusCode)
            {
                // Read the content as a string
                string content = await response.Content.ReadAsStringAsync();

                // Return the CSV content
                return Content(content, "application/json");
            }
            else
            {
                // If the request was not successful, return an appropriate error response
                return StatusCode((int)response.StatusCode, "Failed to retrieve XML data.");
            }
        }
        [HttpGet("get-json")]
        public async Task<IActionResult> GetJsonAsync()
        {
            // Make a GET request to the desired endpoint
            HttpResponseMessage response = await client.GetAsync("/json");

            // Check if the request was successful
            if (response.IsSuccessStatusCode)
            {
                // Read the content as a string
                string content = await response.Content.ReadAsStringAsync();

                // Return the Json content
                return Content(content, "application/json");
            }
            else
            {
                // If the request was not successful, return an appropriate error response
                return StatusCode((int)response.StatusCode, "Failed to retrieve XML data.");
            }
        }
        [HttpGet("get-text")]
        public async Task<IActionResult> GetTextAsync()
        {
            // Make a GET request to the desired endpoint
            HttpResponseMessage response = await client.GetAsync("/text");

            // Check if the request was successful
            if (response.IsSuccessStatusCode)
            {
                // Read the content as a string
                string content = await response.Content.ReadAsStringAsync();

                // Return the Text content
                return Content(content, "application/json");
            }
            else
            {
                // If the request was not successful, return an appropriate error response
                return StatusCode((int)response.StatusCode, "Failed to retrieve XML data.");
            }
        }

    }
}