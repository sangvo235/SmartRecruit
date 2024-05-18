"use server"
import { cookies } from "next/headers";

export async function handleRefresh() {
    console.log('handleRefresh');

    const refreshToken = await getRefreshToken();

    const token = await fetch('http://170.64.172.207:1337/api/auth/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({
            refresh: refreshToken
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((json) => {
            console.log('Response - Refresh:', json);

            if (json.access) {
                cookies().set('session_access_token', json.access, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 60 * 60, // 60 minutes
                    path: '/'
                });

                return json.access;
            } else {
                resetAuthCookies();
            }
        })
        .catch((error) => {
            console.log('error', error);

            resetAuthCookies();
        })

    return token;
}

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    cookies().set("session_userid", userId, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure : false,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
    });
    cookies().set("session_access_token", accessToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure : false,
        maxAge: 60 * 60, // 60 mins
        path: "/",
    });
    cookies().set("session_refresh_token", refreshToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure : false,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
    });
}

export async function resetAuthCookies() {
    console.log('resetAuthCookies');
    cookies().set("session_userid", "");
    cookies().set("session_access_token", "");
    cookies().set("session_refresh_token", "");
}

export async function isAdmin() {
    try {
        const userId = cookies().get("session_userid")?.value;
        const accessToken = await getAccessToken();

        if (userId && accessToken) {
            const response = await fetch(`http://170.64.172.207:1337/api/user_details/${userId}/admin/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const userDetails = await response.json();
                return userDetails.is_staff || userDetails.is_superuser;
            } else {
                console.error('Failed to fetch user details:', response.statusText);
                return false;
            }
        } else {
            console.error('User ID or access token is missing');
            return false;
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        return false;
    }
}

export async function getUserId() {
    const userId = cookies().get("session_userid")?.value
    return userId ? userId : null
}

export async function getAccessToken() {
    let accessToken = cookies().get('session_access_token')?.value;

    if (!accessToken) {
        accessToken = await handleRefresh();
    }

    return accessToken;
}

export async function getRefreshToken() {
    let refreshToken = cookies().get('session_refresh_token')?.value;

    return refreshToken;
}