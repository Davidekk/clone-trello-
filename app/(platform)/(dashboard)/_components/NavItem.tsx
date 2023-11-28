"use client";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: any;
  onExpand: (key: string) => void;
}

const NavItem = ({
  isActive,
  isExpanded,
  onExpand,
  organization,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: "Boards",
      icon: <Layout className="mr-2 h-4 w-4" />,
      href: `/organization/${organization.organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="mr-2 h-4 w-4" />,
      href: `/organization/${organization.organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      href: `/organization/${organization.organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      href: `/organization/${organization.organization.id}/billing`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2 ">
          <div className="relative h-7 w-7">
            <Image
              fill
              src={organization.organization.imageUrl}
              alt="Organization image"
              className="rounded bg-cover"
            ></Image>
          </div>
          <span className="text-sm font-medium">
            {organization.organization.name}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700 transition">
        {routes.map((route) => {
          return (
            <Button
              key={route.label}
              size="sm"
              onClick={() => {
                onClick(route.href);
              }}
              variant="ghost"
              className={cn(
                "w-full font-normal justify-start pl-10 mb-1",
                pathname === route.href && "bg-sky-500/10 text-sky-700"
              )}
            >
              {route.icon}
              {route.label}
            </Button>
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
};

NavItem.Skeleton = function NavItemSkeleton() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative h-10 w-10 shrink-0">
        <Skeleton className="absolute h-full w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

export default NavItem;
