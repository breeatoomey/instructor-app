import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as mdIcons from "react-icons/md";
import * as tbIcons from "react-icons/tb";

export const SidebarData = [
  {
    title: "Lessons",
    path: "/lessons",
    icon: <FaIcons.FaBookReader />,
    cName: "nav-text",
  },
  {
    title: "Classroom Settings",
    path: "/classroomSettings",
    icon: <IoIcons.IoMdSettings />,
    cName: "nav-text",
  },
  {
    title: "Add Lessons",
    path: "/addLessons",
    icon: <mdIcons.MdLibraryAdd />,
    cName: "nav-text",
  },
  {
    title: "Roster",
    path: "/roster",
    icon: <mdIcons.MdPeople />,
    cName: "nav-text",
  },
  {
    title: "Edit Knowledge Graph",
    path: "/editKnowledgeGraph",
    icon: <tbIcons.TbBrandGraphql />,
    cName: "nav-text",
  },
];
