import { Box, CircularProgress, Typography } from "@mui/material"

import { content } from "@/styles/font"

const ProgressPercentage = ({ value }: { value: number }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value}
        color="inherit"
        size={50}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.inherit"
          style={content.style}
          sx={{
            fontSize: "var(--caption)",
            margin: "auto",
          }}
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  )
}

export default ProgressPercentage
