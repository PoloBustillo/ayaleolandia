/** @format */

import React from "react";
import { useState, useEffect } from "react";
import { TopMsg } from "./TopMsg";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const TopBar = (props) => {
  const [index, setIndex] = useState(0);
  const [close, setClose] = useState(false);
  const { data, error } = useSWR("/api/top-bar-msgs", fetcher);

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        if (index < data.length - 1) {
          setIndex(index + 1);
        } else {
          setIndex(0);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return !close && data ? (
    <div className="top-bar-container">
      <a href={data[index].url} rel="nofollow">
        <div id="top-bar" className="border-top-bar">
          <TopMsg msg={data[index]}></TopMsg>
        </div>
      </a>
      <div
        className="border-top-bar"
        id="close-top-bar"
        onClick={() => {
          setClose(true);
        }}
      >
        <span className="visually-hidden">Cerrar Barra</span>
        <img
          id="x-img"
          src={"/close.png"}
          height="15px"
          alt="Close Top Bar Leolandia"
        />
      </div>
    </div>
  ) : null;
};
