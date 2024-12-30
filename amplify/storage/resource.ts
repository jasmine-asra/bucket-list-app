import { defineStorage } from "@aws-amplify/backend";

// Define a storage resource:
// - only the user who uploaded the image can access it
// - the entity_id will be replaced with the user's id during uploads
export const storage = defineStorage({
    name: "amplifyBucketTrackerImages",
    access: (allow) => ({
        "media/{entity_id}/*": [
            allow.entity("identity").to(["read", "write", "delete"]),
        ],
    }),
});