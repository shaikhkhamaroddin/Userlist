import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: 'https://api.GitHub.com/',
    timeout: 1000,
    headers: {
      'Accept': 'application/vnd.GitHub.v3+json',
      //'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
    }
  });

  export async function getUsers({ queryKey }) {
    const [key, name] = queryKey;
    let count = 10;
    const url = name !== null ? `/users/${name}` : `/users?per_page=${count}`;
    const response = await axiosInstance.get(url);
    if (response.status == 200) {
      return response.data;
    } else {
      alert('error fetching data!');
    }
  }