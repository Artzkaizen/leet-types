"use client";

import { api } from "@/trpc/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const LangSettings = () => {
  const { data, isPending, error } = api.ts.getVersions.useQuery({
    limit: 20,
  });

  if (isPending) return null;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <Select defaultValue={data[0]}>
        <SelectTrigger>
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {data?.map((version) => (
            <SelectItem key={version} value={version}>
              {version}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LangSettings;
