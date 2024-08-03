"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export const useCodeCotizacion = () => {
  const [lastCodeCotizacion, setLastCodeCotizacion] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const getCotizaciones = async () => {
    try {
      const response = await axios.get("/api/codeCotizacion", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      if (response.status == 200) {
        console.log(response.data);
        setLastCodeCotizacion(response.data);
      }
    } catch (error) {
      console.error("Hubo un error en useGetUpdateCotizacion, getCotizaciones");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCotizaciones();
  }, []);

  return { lastCodeCotizacion, isLoading };
};

// "use client";

// import axios from "axios";
// import { useEffect, useState } from "react";

// export const useCodeCotizacion = () => {
//   const [lastCodeCotizacion, setLastCodeCotizacion] = useState<string | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState(true);

//   const getCotizaciones = async () => {
//     try {
//       const response = await fetch("/api/codeCotizacion", {
//         method: "GET",
//         cache: "no-store",
//         headers: {
//           "Cache-Control":
//             "no-store, no-cache, must-revalidate, proxy-revalidate",
//           Pragma: "no-cache",
//           Expires: "0",
//           "Surrogate-Control": "no-store",
//         },
//       });
//       console.log(response);

//       if (response.status == 200) {
//         const res = await response.json();
//         console.log(res);
//         setLastCodeCotizacion(res);
//       }
//       // if (response.status == 200) {
//       //   console.log(response.data);
//       //   setLastCodeCotizacion(response.data);
//       // }
//     } catch (error) {
//       console.error("Hubo un error en useGetUpdateCotizacion, getCotizaciones");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getCotizaciones();
//   }, []);

//   return { lastCodeCotizacion, isLoading };
// };
