import { useLocation } from "react-router-dom";
import SanctuaryForm from "../components/SanctuaryForm";
import { useEffect, useState } from "react";
import { SanctuaryDTO } from "../types/SanctuaryDTO";
import { UseSanctuaryPetsBySanctuaryIdPaginated } from "../hooks/UseSanctuaryPetsBySanctuaryIdPaginated";
import { SanctuaryPetWithPetInfo } from "../types/SanctuaryPetWithPetInfo";
import SanctuaryPetCard from "../components/SanctuaryPetCard";

export default function SanctuaryInfoWithPetsPage() {
    const location = useLocation();
    const sanctuary: SanctuaryDTO = location.state.sanctuary || {};
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(2);
    const [sanctuaryPets, setSanctuaryPets] = useState([] as SanctuaryPetWithPetInfo[]);
    const sanctuaryId = sanctuary.id;

    const {
        data: sanctuaryPetsWithPetInfo,
        isPending: isLoadingSanctuaryPets,
        error: sanctuaryPetsError
    } = UseSanctuaryPetsBySanctuaryIdPaginated({
        page: page,
        size: size,
        sanctuaryId: sanctuaryId
    });

    useEffect(() => {
        if (!isLoadingSanctuaryPets && sanctuaryPetsWithPetInfo?.items) {
            setSanctuaryPets(sanctuaryPetsWithPetInfo.items);
        }
    }, [isLoadingSanctuaryPets, sanctuaryPetsWithPetInfo]);

    return (
        <>
            <h4>Pets</h4>
            {sanctuaryPets.map((sanctuaryPet) => (
                <SanctuaryPetCard key={sanctuaryPet.id} sanctuaryPet={sanctuaryPet} />
            ))}
        </>
    );
}
