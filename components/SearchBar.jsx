/** @format */
import React from "react";
import Image from "next/image";
import { Row } from "react-bootstrap";
import SearchInput, { createFilter } from "react-search-input";
import { useState } from "react";

const KEYS_TO_FILTERS = ["user.name", "subject", "dest.name", "id"];
let emails = [
  {
    id: 1,
    user: {
      name: "Mathieu",
      job: "Software Engineer",
      company: "Enki",
    },
    subject: "Hi!",
    dest: [
      {
        name: "Gonzalo",
        job: "CTO",
        company: "Enki",
      },
      {
        name: "Arseny",
        job: "Software Engineer",
        company: "Enki",
      },
    ],
  },
  {
    id: 2,
    user: {
      name: "Bruno",
    },
    subject: "javascript",
    dest: [
      {
        name: "Mathieu",
        job: "CTO",
        company: "Enki",
      },
      {
        name: "Arseny",
        job: "Software Engineer",
        company: "Enki",
      },
    ],
  },
  {
    id: 3,
    user: {
      name: "Otro",
    },
    subject: "java",
    dest: [
      {
        name: "Bruno",
        job: "CTO",
        company: "Enki",
      },
      {
        name: "Arseny",
        job: "Software Engineer",
        company: "Enki",
      },
    ],
  },
];

export const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredEmails = emails.filter(
    createFilter(searchTerm, KEYS_TO_FILTERS)
  );
  return (
    <Row className="search-bar-container">
      <span className="search-bar">
        <SearchInput
          className="search-input"
          placeholder="Buscar producto"
          onChange={(term) => {
            setSearchTerm(term);
          }}
        />
        <Image
          onClick={() => {
            props.closeFunc();
          }}
          id="x-black"
          src={"/xBlack.png"}
          height={25}
          width={25}
          alt="Close Top Bar Leolandia"
        />
      </span>
      {filteredEmails.map((email) => {
        return (
          <span key={email.id} className="filter-search">
            {email.user.name}
            {" / "}
          </span>
        );
      })}
    </Row>
  );
};
