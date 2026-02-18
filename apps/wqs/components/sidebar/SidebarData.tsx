import { Role } from "@repo/db/types";

import {
  LayoutDashboard,
  CreditCard,
  BadgeDollarSign,
  BarChart3,
  ListChecks,
  AlertCircle,
  FlaskConical,
  CheckCircle2,
  LayoutDashboardIcon,
} from "lucide-react"


const userRoutes = [
    {
      title: "My Requests",
      url: "/requests",
      icon: LayoutDashboard, // more generic & professional
      isActive: true,
      items: [
        {
          title: "Pending",
          url: "/requests/pending",
          icon: ListChecks,
        },
        {
          title: "Action Needed",
          url: "/requests/action-needed",
          icon: AlertCircle,
        },
        {
          title: "Testing",
          url: "/requests/testing",
          icon: FlaskConical,
        },
        {
          title: "Completed",
          url: "/requests/completed",
          icon: CheckCircle2,
        },
      ],
    },
    {
      title: "Payments",
      url: "/payments",
      icon: CreditCard,
    },
    {
      title: "Pricing",
      url: "/pricing",
      icon: BadgeDollarSign,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: BarChart3,
    },
]

const technicianRoutes = [
    {
      title: "Requests",
      url: "/requests",
      icon: LayoutDashboard, // more generic & professional
      isActive: true,
      items: [
        {
          title: "Pending",
          url: "/requests/pending",
          icon: ListChecks,
        },
        {
          title: "Sample Collection",
          url: "/requests/sample-collection",
          icon: AlertCircle,
        },
        {
          title: "Testing",
          url: "/requests/testing",
          icon: FlaskConical,
        },
        {
          title: "Completed",
          url: "/requests/completed",
          icon: CheckCircle2,
        },
      ],
    },
]

const adminRoutes = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
        title: "Payments",
        url: "/payments",
        icon: CreditCard,
    }
]

export const fetchSidebarData = (role: Role) => {
  switch (role) {
    case Role.user:
      return userRoutes;
    case Role.technician:
      return technicianRoutes;
    case Role.admin:
      return adminRoutes;
    default:
      return [];
  }
};