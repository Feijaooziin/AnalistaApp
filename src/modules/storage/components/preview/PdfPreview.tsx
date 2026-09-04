// import { useState } from "react";
// import { ActivityIndicator, Text, View } from "react-native";
// import Pdf from "react-native-pdf";

// import { useTheme } from "@/src/contexts/ThemeContext";

// export default function PdfPreview({ file }: any) {
//   const { colors } = useTheme();

//   const [loading, setLoading] = useState(true);
//   const [pages, setPages] = useState(0);
//   const [page, setPage] = useState(1);

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: colors.background,
//       }}
//     >
//       {/* INFO BAR */}
//       <View
//         style={{
//           height: 40,
//           justifyContent: "center",
//           alignItems: "center",
//           borderBottomWidth: 1,
//           borderBottomColor: colors.border,
//           backgroundColor: colors.surface,
//         }}
//       >
//         <Text
//           style={{
//             color: colors.text,
//             fontSize: 14,
//           }}
//         >
//           Página {page} de {pages || "-"}
//         </Text>
//       </View>

//       {loading && (
//         <View
//           style={{
//             position: "absolute",
//             zIndex: 10,
//             top: 0,
//             bottom: 0,
//             left: 0,
//             right: 0,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <ActivityIndicator size="large" color={colors.primary} />

//           <Text
//             style={{
//               color: colors.textSecondary,
//               marginTop: 12,
//             }}
//           >
//             Carregando PDF...
//           </Text>
//         </View>
//       )}

//       <Pdf
//         source={{ uri: file.localUri }}
//         style={{
//           flex: 1,
//         }}
//         trustAllCerts={false}
//         onLoadComplete={(numberOfPages) => {
//           setPages(numberOfPages);
//           setLoading(false);
//         }}
//         onPageChanged={(currentPage) => {
//           setPage(currentPage);
//         }}
//         onError={(error) => {
//           console.log(error);
//           setLoading(false);
//         }}
//       />
//     </View>
//   );
// }
