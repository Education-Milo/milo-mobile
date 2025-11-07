import { Keyboard, StyleSheet } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { colors } from '@theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';

interface BottomSheetComponentProps extends BottomSheetModalProps {
  children: React.ReactNode;
  ref?: React.RefObject<BottomSheetModal>;
}

const BottomSheetComponent = (props: BottomSheetComponentProps) => {
  const { children, ref, ...rest } = props;
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose={true}
      enableHandlePanningGesture={true}
      enableContentPanningGesture={true}
      handleStyle={styles.handle}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.background}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          onPress={() => {
            Keyboard.dismiss();
            ref?.current?.dismiss();
          }}
        />
      )}
      {...rest}
    >
      <BottomSheetView
        style={[styles.container, { paddingBottom: insets.bottom + 16 }]}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: colors.background,
  },
  handle: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  handleIndicator: {
    backgroundColor: colors.white_60,
  },
  background: {
    backgroundColor: colors.background,
  },
});

export default BottomSheetComponent;
