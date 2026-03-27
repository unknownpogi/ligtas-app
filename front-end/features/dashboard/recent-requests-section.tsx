import { RequestItem, VolunteerProps } from "@/types";
import { FlatList, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CardRequest } from "@/components/card-request";
import { VolunteersCard } from "@/components/custome-volunteers-card";

// type RequestListProps = {
//   requestListData: RequestItem[];
//   taskButton: boolean;
//   handleSelectRequest: (id: string) => void;
// };

type RequestListProps =
  | {
      taskButton: false;
      requestListData: RequestItem[];
      handleSelectRequest: (id: string) => void;
    }
  | {
      taskButton: true;
      volunteerData: VolunteerProps[];
      handleSelectRequest: (id: string) => void;
    };

export const RecentRequestsSection = (props: RequestListProps) => {
  if (props.taskButton) {
    return (
      <FlatList
        data={props.volunteerData}
        scrollEnabled={false}
        keyExtractor={(item) => item.documentId}
        renderItem={({ item }) => (
          <VolunteersCard
            documentId={item.documentId}
            firstName={item.firstName}
            lastName={item.lastName}
            phoneNumber={item.phoneNumber}
            stats={item.stats}
            selectedVolunteer={props.handleSelectRequest}
          />
        )}
      />
    );
  }

  return (
    <FlatList
      data={props.requestListData}
      scrollEnabled={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CardRequest
          id={item.id}
          documentId={item.documentId}
          manageRequest={false}
          typeNeed={item.typeNeed}
          createdAt={item.createdAt}
          stats={item.stats}
          progress={item.progress}
          category={item.category}
          urgencyType={item.urgencyType}
          address={item.address}
          peopleAffected={item.peopleAffected}
          requester={item.requester}
          selectedRequest={props.handleSelectRequest}
        />
      )}
    />
  );
};
// export const RecentRequestsSection = (props: RequestListProps) => {
//   if (props.taskButton) {
//     // ✅ Volunteer mode
//     return (
//       <FlatList
//         data={props.volunteerData}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <VolunteersCard
//             label={item.name}
//             urgency={item.urgency}
//             status={item.status}
//           />
//         )}
//       />
//     );
//   }
//   // return (
//   //   <FlatList
//   //     data={requestListData}
//   //     scrollEnabled={false}
//   //     keyExtractor={(item) => item.id}
//   //     contentContainerStyle={{
//   //       gap: 10,
//   //     }}
//   //     renderItem={({ item }) =>
//   //       taskButton ? (
//   //         <VolunteersCard
//   //           label={item.label}
//   //           urgency={item.urgency}
//   //           status={item.status}
//   //         />
//   //       ) : (
//   //         <CardRequest
//   //           id={item.id}
//   //           label={item.label}
//   //           status={item.status}
//   //           progress={item.progress}
//   //           category={item.category}
//   //           urgency={item.urgency}
//   //           location={item.location}
//   //           requesterName={item.requesterName}
//   //           selectedRequest={handleSelectRequest}
//   //         />
//   //       )
//   //     }
//   //   />
//   // );
// };
