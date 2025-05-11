export interface RoomInformation {
    Id: number;
    RoomNumber: number;
    MaximumOccupancy: number;
    NumberOfKingBeds: number;
    NumberOfQueenBeds: number;
    NumberOfDoubleBeds: number;
    Description?: string
}