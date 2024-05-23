from fastapi import FastAPI, Request, Response

app = FastAPI()

@app.post("/githubwebhooksjson")
async def github_webhook(request: Request):
    data = await request.body()
    print(data)
    return 

@app.post("/githubwebhookform")
async def github_webhook(request: Request, response: Response):
    if request.headers.get("content-type") == "application/x-www-form-urlencoded":
        form_data = await request.form()
        payload = form_data['payload']
        print(payload)
        response.status_code = 200
    else:
        response.status_code = 400