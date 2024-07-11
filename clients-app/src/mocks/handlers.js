import { http, HttpResponse } from "msw";
import clients from './mockJson'


export const handlers = [
  http.get("/api/candidate", (resolver) => {
    return HttpResponse.json(clients);
  }),

  http.post("/api/candidate/save", async ({ request }) => {
    const requestBody = await request.json();
    return HttpResponse.json(
      {
        content: requestBody.content,
      },
      { statur: 201 }
    );
  }),

  http.delete("/api/candidate/delete", async ({ request }) => {
    const requestBody = await request.json();
    return HttpResponse.json(
      {
        content: requestBody.content,
      },
      { statur: 201 }
    );
  }),

  http.patch("/api/candidate/edit", async ({ request }) => {
    const requestBody = await request.json();
    return HttpResponse.json(
      {
        content: requestBody.content,
      },
      { statur: 201 }
    );
  }),
];
