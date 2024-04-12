import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Not Able to fetch the Cabins");
  }
  return data;
}

export async function createNewCabin(newCabin) {
  //1. Create a cabin
  console.log(newCabin);
  const hasImagepath = newCabin.image[0].name.startsWith(supabaseUrl);
  const imageName = `${Math.floor(Math.random() * 9000) + 1000}-${
    newCabin.image[0].name
  }`; //.replaceAll("/", "")

  const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: hasImagepath ? newCabin.image : imageUrl }])
    .select();
  if (error) {
    throw new Error("No cabin has been created");
  }

  if (hasImagepath) return data;

  // 2. Upload a Cabin
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image[0]);

  if (storageError) {
    console.error(storageError.message);
    throw new Error("Image is not uploaded, Cabin is not created. ");
  }

  return data;
}

export async function copyCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: newCabin.image }])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("No cabin has been created");
  }
  return data;
}

export async function editCabin(id, cabin) {
  //  If Edit a Image
  if (cabin.image) {
    const changeImage = `${Math.floor(Math.random() * 9000) + 1000}-${
      cabin.image.name
    }`;

    const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/${changeImage}`;
    const { data, error } = await supabase
      .from("cabins")
      .update({ ...cabin, image: imageUrl })
      .eq("id", id);

    if (error) {
      console.error(error.message);
      throw new Error("No cabin has been Edited");
    }

    // 2. Upload a Cabin
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(changeImage, cabin.image);

    if (storageError) {
      console.error(storageError.message);
      throw new Error("Image is not uploaded, Cabin is not created. ");
    }
    console.log(data);

    return data;
  }

  const { data, error } = await supabase
    .from("cabins")
    .update(cabin)
    .eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("No cabin has been Edited");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Not Able to Delete the Cabin");
  }

  return data;
}
