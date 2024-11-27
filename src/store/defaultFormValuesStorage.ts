import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DefaulFormValues } from "@prisma/client";

interface DefaultValuesState {
  defaultValues: Omit<DefaulFormValues, "id">;
  fetchDefaultValues: () => Promise<void>;
  createUpdateDefaultValues: (
    defaultValues: Omit<DefaulFormValues, "id">
  ) => Promise<void>;
}

const useDefaultValuesStore = create<DefaultValuesState>()(
  persist(
    (set, get) => ({
      // Valores iniciales
      defaultValues: {
        companyEmail: "",
        companyPhone: "",
        bankAccountNumber: "",
      },

      // Sincronizar con el servidor
      fetchDefaultValues: async () => {
        try {
          const response = await fetch("/api/cotizacion/default-form-values");
          const data = await response.json();
          set({ defaultValues: data });
        } catch (error) {
          console.error("Error fetching default values:", error);
        }
      },

      // Actualizar valores por defecto
      createUpdateDefaultValues: async (
        defaultValues: Omit<DefaulFormValues, "id">
      ) => {
        try {
          await fetch("/api/cotizacion/default-form-values", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(defaultValues),
          });

          // Actualizar el estado local
          set({ defaultValues: defaultValues });
        } catch (error) {
          console.error("Error updating default values:", error);
        }
      },
    }),
    {
      name: "default-form-values-storage", // Nombre de la clave en localStorage
    }
  )
);

export default useDefaultValuesStore;
