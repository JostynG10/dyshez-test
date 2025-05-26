"use client";

import React, { createContext, useContext, useState } from "react";
import type PicturesContext from "@interfaces/PicturesContext";

/**
 * Context for managing the selected image in the app.
 * Create the context with undefined as initial value
 */
const PicturesContext = createContext<PicturesContext | undefined>(undefined);

/**
 * Custom hook to use the PicturesContext.
 * Throws and error if used outside the provider.
 */
export const usePicturesContext = () => {
  const context = useContext(PicturesContext);
  if (!context)
    throw new Error(
      "usePicturesContext must be used within a PicturesProvider"
    );
  return context;
};

/**
 * Provider for the PicturesContext.
 * Shares selectedUrl state and its setter.
 */
export const PicturesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State for the selected image URL (string or null)
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  return (
    <PicturesContext.Provider value={{ selectedUrl, setSelectedUrl }}>
      {children}
    </PicturesContext.Provider>
  );
};
