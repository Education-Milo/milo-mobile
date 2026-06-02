import React, { useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheetComponent from "@components/BottomSheetModal.component";
import Typography from "@components/Typography.component";
import { colors } from "@theme/colors";
import { useTranslation } from "react-i18next";
import { OcrProcessingAction } from "@hooks/ocr/useScanOrImportDocument";

type Props = {
  isUploading: boolean;
  onSend: () => void;
  onDelete: () => void;
  showDeleteModal: boolean;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  showSendModal: boolean;
  onCancelSend: () => void;
  onConfirmSend: (action?: OcrProcessingAction) => void;
  canChooseProcessing?: boolean;
  documentType: string;
};

const ScanOrImportFooter = (props: Props) => {
  const { t } = useTranslation();
  const deleteSheetRef = useRef<BottomSheetModal>(null);
  const sendSheetRef = useRef<BottomSheetModal>(null);
  const {
    isUploading,
    onSend,
    onDelete,
    showDeleteModal,
    onCancelDelete,
    onConfirmDelete,
    showSendModal,
    onCancelSend,
    onConfirmSend,
    canChooseProcessing,
    documentType,
  } = props;
  const isCourseDocument = documentType === "cours";
  const processingTitle = isCourseDocument
    ? "Que veux-tu faire avec ce cours ?"
    : "Que veux-tu faire avec cet exercice ?";
  const processingDescription = isCourseDocument
    ? "Milo peut générer un QCM basé sur les notes fournies."
    : "Milo peut générer un exercice similaire à partir de ton image.";
  const processingAction = isCourseDocument ? "qcm" : "exercise";
  const processingActionLabel = isCourseDocument
    ? "Générer un QCM"
    : "Générer un exercice similaire";
  const processingActionIcon = isCourseDocument
    ? "help-circle-outline"
    : "repeat-outline";

  useEffect(() => {
    if (showDeleteModal) {
      deleteSheetRef.current?.present();
    } else {
      deleteSheetRef.current?.dismiss();
    }
  }, [showDeleteModal]);

  useEffect(() => {
    if (showSendModal) {
      sendSheetRef.current?.present();
    } else {
      sendSheetRef.current?.dismiss();
    }
  }, [showSendModal]);

  return (
    <>
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.sendButton]}
          onPress={onSend}
          disabled={isUploading}
        >
          {isUploading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.text.white} />
              <Typography variant="button" style={styles.loadingText}>
                {t("scanImport.footer.uploading")}
              </Typography>
            </View>
          ) : (
            <View style={styles.actionButtonContent}>
              <Ionicons
                name="cloud-upload"
                size={24}
                color={colors.text.white}
              />
              <Typography variant="button" style={styles.actionButtonText}>
                {t("scanImport.footer.sendDocument")}
              </Typography>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={onDelete}
          disabled={isUploading}
        >
          <View style={styles.actionButtonContent}>
            <Ionicons name="trash" size={24} color={colors.text.white} />
            <Typography variant="button" style={styles.actionButtonText}>
              {t("scanImport.footer.delete")}
            </Typography>
          </View>
        </TouchableOpacity>
      </View>

      <BottomSheetComponent
        ref={deleteSheetRef}
        snapPoints={["34%"]}
        onDismiss={onCancelDelete}
      >
        <View style={styles.sheetContainer}>
          <Typography
            variant="h5"
            color={colors.text.primary}
            style={styles.modalTitle}
          >
            {t("scanImport.footer.deleteTitle")}
          </Typography>
          <Typography
            variant="body"
            color={colors.text.secondary}
            style={styles.modalText}
          >
            {t("scanImport.footer.deleteConfirm")}
          </Typography>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonCancel]}
              onPress={onCancelDelete}
            >
              <Typography
                variant="button"
                color={colors.text.secondary}
                style={styles.modalButtonText}
              >
                {t("scanImport.footer.cancel")}
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonDelete]}
              onPress={onConfirmDelete}
            >
              <Typography
                variant="button"
                color={colors.text.white}
                style={styles.modalButtonText}
              >
                {t("scanImport.footer.delete")}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetComponent>

      <BottomSheetComponent
        ref={sendSheetRef}
        snapPoints={[canChooseProcessing ? "48%" : "34%"]}
        onDismiss={onCancelSend}
      >
        <View style={styles.sheetContainer}>
          <Typography
            variant="h5"
            color={colors.text.primary}
            style={styles.modalTitle}
          >
            {canChooseProcessing
              ? processingTitle
              : t("scanImport.footer.sendTitle")}
          </Typography>
          <Typography
            variant="body"
            color={colors.text.secondary}
            style={styles.modalText}
          >
            {canChooseProcessing
              ? processingDescription
              : t("scanImport.footer.sendConfirm")}
          </Typography>
          {canChooseProcessing ? (
            <View style={styles.processingChoices}>
              <TouchableOpacity
                style={[styles.processingChoice, styles.exerciseChoice]}
                onPress={() => onConfirmSend(processingAction)}
                disabled={isUploading}
              >
                <Ionicons
                  name={processingActionIcon}
                  size={22}
                  color={colors.white}
                />
                <Typography
                  variant="button"
                  color={colors.text.white}
                  style={styles.modalButtonText}
                >
                  {processingActionLabel}
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={onCancelSend}
                disabled={isUploading}
              >
                <Typography
                  variant="button"
                  color={colors.text.secondary}
                  style={styles.modalButtonText}
                >
                  {t("scanImport.footer.cancel")}
                </Typography>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={onCancelSend}
                disabled={isUploading}
              >
                <Typography
                  variant="button"
                  color={colors.text.secondary}
                  style={styles.modalButtonText}
                >
                  {t("scanImport.footer.cancel")}
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSend]}
                onPress={() => onConfirmSend()}
                disabled={isUploading}
              >
                {isUploading ? (
                  <ActivityIndicator color={colors.text.white} size="small" />
                ) : (
                  <Typography
                    variant="button"
                    color={colors.text.white}
                    style={styles.modalButtonText}
                  >
                    {t("scanImport.footer.send")}
                  </Typography>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </BottomSheetComponent>
    </>
  );
};

const styles = StyleSheet.create({
  actionButtonsContainer: {
    gap: 12,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButton: {
    backgroundColor: colors.primary,
  },
  deleteButton: {
    backgroundColor: colors.error,
    marginBottom: 0,
  },
  actionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    marginLeft: 8,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginLeft: 12,
  },
  sheetContainer: {
    alignItems: "center",
    paddingHorizontal: 4,
  },
  modalTitle: {
    marginBottom: 10,
  },
  modalText: {
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 100,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: colors.border.light,
  },
  modalButtonDelete: {
    backgroundColor: colors.error,
  },
  modalButtonSend: {
    backgroundColor: colors.primary,
  },
  processingChoices: {
    width: "100%",
    gap: 12,
  },
  processingChoice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  exerciseChoice: {
    backgroundColor: colors.primary,
  },
  chatChoice: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  modalButtonText: {},
});

export default ScanOrImportFooter;
