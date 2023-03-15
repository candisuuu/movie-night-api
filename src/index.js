import { handleRequest } from "./handler";
import jwt from '@tsndr/cloudflare-worker-jwt';

const verifyRequest = async (request) => {
	const accessToken = request.headers.get('authorization');

    if (!accessToken)
		return false;
    else {
		const isValid = await jwt.verify(accessToken, 'secret');

        if (isValid)
            return true;
        else
			return false;
    }
}

addEventListener('fetch', (event) => {
	event.passThroughOnException();
	const checkVerifiedRequest = verifyRequest(event.request);
	if (checkVerifiedRequest)
		event.respondWith(handleRequest(event.request));
	else
		event.respondWith(new Response("Unauthorized", { status: 401 }));
});