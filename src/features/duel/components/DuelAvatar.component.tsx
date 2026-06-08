import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import TypographyComponent from "@shared/components/Typography.component";
import { colors } from "@shared/theme/colors";
import { getInitials } from "./duelFooter.helpers";

interface DuelAvatarProps {
  name: string;
  avatar?: ImageSourcePropType;
  size?: "small" | "regular";
}

const DuelAvatar = ({ name, avatar, size = "regular" }: DuelAvatarProps) => {
  const avatarStyle = size === "small" ? styles.avatarSmall : styles.avatar;

  if (avatar) {
    return <Image source={avatar} style={avatarStyle} resizeMode="cover" />;
  }

  return (
    <View style={[avatarStyle, styles.avatarFallback]}>
      <TypographyComponent variant="label" style={styles.avatarFallbackText}>
        {getInitials(name)}
      </TypographyComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: "#EEE",
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEE",
  },
  avatarFallback: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarFallbackText: {
    color: colors.white,
  },
});

export default DuelAvatar;
