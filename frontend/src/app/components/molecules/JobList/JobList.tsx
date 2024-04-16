'use client'

import { useEffect, useState } from "react"

const JobList = () => {
    const getJobs = async () => {
        const url = 'http://localhost:8000/api/jobs/'

        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((json) => {
                console.log('json', json);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        };

    useEffect(() => {
        getJobs();
    }, []);

    return (
        <div>
            <h1>Info from db will be displayed below, component still WIP:</h1>
        </div>
    )
}

export default JobList;