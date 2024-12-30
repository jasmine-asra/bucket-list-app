import { useState, useEffect } from "react";
import {
  Authenticator,
  Button,
  Text,
  TextField,
  Heading,
  Flex,
  View,
  Image,
  Grid,
  Divider,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { getUrl } from "aws-amplify/storage";
import { uploadData } from "aws-amplify/storage";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */


Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});


export default function App() {
  const [items, setItems] = useState([]);


  useEffect(() => {
    fetchItems();
  }, []);


  async function fetchItems() {
    const { data: items } = await client.models.BucketItem.list();
    await Promise.all(
      items.map(async (item) => {
        if (item.image) {
          const linkToStorageFile = await getUrl({
            path: ({ identityId }) => `media/${identityId}/${item.image}`,
          });
          console.log(linkToStorageFile.url);
          item.image = linkToStorageFile.url;
        }
        return item;
      })
    );
    console.log(items);
    setItems(items);
  }


  async function createItem(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    console.log(form.get("image").name);


    const { data: newItem } = await client.models.BucketItem.create({
      title: form.get("title"),
      description: form.get("description"),
      image: form.get("image").name,
    });


    console.log(newItem);
    if (newItem.image)
      await uploadData({
        path: ({ identityId }) => `media/${identityId}/${newItem.image}`,
        data: form.get("image"),
      }).result;


    fetchItems();
    event.target.reset();
  }


  async function deleteItem({ id }) {
    const toBeDeletedItem = {
      id: id,
    };


    const { data: deletedItem } = await client.models.BucketItem.delete(
      toBeDeletedItem
    );
    console.log(deletedItem);


    fetchItems();
  }


  return (
    <Authenticator>
      {({ signOut }) => (
        <Flex
          className="App"
          justifyContent="center"
          alignItems="center"
          direction="column"
          maxWidth="1200px"
          padding="2rem"
          backgroundColor="#f9fafc"
          borderRadius="12px"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        >
          <Heading level={1} color="#2c3e50" marginBottom="1rem">
            My Bucket List
          </Heading>
          <View as="form" margin="2rem 0" onSubmit={createItem}>
            <Flex
              direction="column"
              gap="1.5rem"
              padding="1.5rem"
              backgroundColor="#ffffff"
              borderRadius="12px"
              boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            >
              <TextField
                name="title"
                placeholder="Bucket List Item"
                label="Bucket List Item"
                labelHidden
                variation="quiet"
                required
                size="large"
              />
              <TextField
                name="description"
                placeholder="Description"
                label="Description"
                labelHidden
                variation="quiet"
                required
                size="large"
              />
              <View
                name="image"
                as="input"
                type="file"
                alignSelf={"center"}
                accept="image/png, image/jpeg"
                style={{ marginTop: "1rem", fontSize: "1rem" }}
              />
              <Button type="submit" variation="primary" size="large">
                Add to Bucket List
              </Button>
            </Flex>
          </View>
          <Divider />
          <Heading level={2} color="#34495e" margin="2rem 0">
            My Bucket List Items
          </Heading>
          <Grid
            templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gap="1.5rem"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            {items.map((item) => (
              <Flex
                key={item.id || item.title}
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap="1rem"
                padding="1.5rem"
                backgroundColor="#ffffff"
                borderRadius="10px"
                boxShadow="0 2px 6px rgba(0, 0, 0, 0.1)"
                style={{
                  maxWidth: "300px",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <Heading level="3" color="#2c3e50" fontSize="1.2rem">
                  {item.title}
                </Heading>
                <Text fontStyle="italic" color="#7f8c8d" fontSize="1rem">
                  {item.description}
                </Text>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={`Visual for ${item.title}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                )}
                <Button
                  variation="destructive"
                  size="small"
                  onClick={() => deleteItem(item)}
                  style={{ fontSize: "0.9rem", padding: "0.5rem 1rem" }}
                >
                  Delete Item
                </Button>
              </Flex>
            ))}
          </Grid>
          <Button
            onClick={signOut}
            marginTop="2rem"
            size="large"
            variation="primary"
          >
            Sign Out
          </Button>
        </Flex>
      )}
    </Authenticator>
  );  
}
