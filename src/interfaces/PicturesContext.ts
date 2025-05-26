export default interface PicturesContext {
  selectedUrl: string | null;
  setSelectedUrl: React.Dispatch<React.SetStateAction<string | null>>;
}
