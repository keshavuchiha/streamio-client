import { UrlParams } from './../typings.d';
import { QueryFunctionContext } from "@tanstack/react-query";
import { tmdbApiKey } from "./../constants/constants";

export const fetchMovieById = async (id: string) => {
  let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}`;
  //   console.log("url", url);
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchMoviesQueryData = async (
  url: string,
  pageParam: QueryFunctionContext,
  urlParams?:UrlParams
) => {
  let pageUrl = `${url}&page=${pageParam}`;
  urlParams?.options.map((option) => {
    pageUrl.concat(`&${option.option}=${option.value}`);
  });
  const response = await fetch(pageUrl);
  const data = await response.json();
  return data;
};

export const fetchInfiniteMovies = async (
  pageParam: QueryFunctionContext,
  query = {}
) => {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&page=${pageParam}`;
  let str = "";
  for (let [key, value] of Object.entries(query)) {
    str += `&${key}=${value}`;
  }
  const response = await fetch(url + str);
  const data = await response.json();
  return data;
};

export const fetchSimilarMovies = async (
  id: string,
  pageParam: QueryFunctionContext
) => {
  // console.log(pageParam,'pageparams');
  let url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${tmdbApiKey}&language=en-US&page=${pageParam}`;
  //   console.log("url", url);
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchTrailers = async (id: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${tmdbApiKey}&language=en-US`
  );
  const data = await response.json();
  return data;
};
