const sendTokenAsCookie = (res, user, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: "success",
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

module.exports = sendTokenAsCookie;
