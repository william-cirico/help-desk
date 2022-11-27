import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { OrderForm } from "../../Forms/OrderForm";
import { Button } from "../Button";
import { Background } from "./styles";

export function NewOrder() {
    const bottomSheetRef = useRef<BottomSheetModal>(null!);

    function handleSnapPress() {
        bottomSheetRef.current.present();
    }

    return (
        <>
            <Button title="Novo chamado" onPress={handleSnapPress} />

            <BottomSheetModalProvider>
                <BottomSheetModal
                    style={{ padding: 24 }}
                    enablePanDownToClose={true}
                    snapPoints={["50%"]}
                    ref={bottomSheetRef}
                    backgroundComponent={() => <Background />}
                >
                    <BottomSheetView>
                        <OrderForm closeSnap={() => bottomSheetRef.current.dismiss()} />
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </>
    );
}