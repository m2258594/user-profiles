import { z } from "zod";
import { UserStatus } from "../constants/statuses";

export const userSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  status: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.DELETED]),
  jobTitle: z.string(),
  location: z.string(),
  phone: z.string(),
  createdAt: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const userPreviewSchema = userSchema.pick({
  id: true,
  fullName: true,
  phone: true,
  status: true,
});

export type UserPreview = z.infer<typeof userPreviewSchema>;
