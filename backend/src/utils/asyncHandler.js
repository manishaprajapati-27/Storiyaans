const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    await requestHandler(req, res, next);
  } catch (error) {
    res.status(error.code || 400).json({
      success: false,
      message: error,
    });
  }
};

// 20840
// 20750

export { asyncHandler };
