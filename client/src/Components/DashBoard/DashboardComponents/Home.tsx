import React from "react";
import "./Home.css";
import NewClass from "./NewClass.js";
import { useState } from "react";
// import { handle } from "express/lib/application";

interface Props {
  items: { id: string; title: string; backgroundImage: string }[];
  heading: string;
  onSelectItem: (item: { id: string; title: string; backgroundImage: string }) => void;
}

export default function Home({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isNewClassActive, setIsNewClassActive] = useState(false);
  const [newItems, setNewItems] = useState(items); // State for managing updated items list

  const handleNewClass = (newItem) => {
    // Function to handle creating a new class
    setNewItems([...newItems, newItem]); // Add new item to the list
    setIsNewClassActive(false); // Close the NewClass form after creation
  };

  return (
    <>
      <h1>{heading}</h1>
      <div className="container">
        {items.map((item, index) => (
          <a
            href={`/class/${item.id}`}
            className={`list-group-item ${selectedIndex === index ? "active" : ""}`}
            key={item.id}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
            style={{ backgroundImage: `url(${item.backgroundImage})` }}
          >
            <span>{item.title}</span>
          </a>
        ))}
        {isNewClassActive && <NewClass onSubmit={handleNewClass} />} {/* Pass handleNewClass as a prop */}
        <a href="#" className="new-class-button" onClick={() => setIsNewClassActive(true)}>
          New Class
        </a>
      </div>
    </>
  );
}
