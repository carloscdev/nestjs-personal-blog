import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

export const handleValidationError = (error: any) => {
  console.log(error);
  if (error?.code === 11000)
    throw new BadRequestException(
      `This field was registered: ${JSON.stringify(error.keyValue)}`,
    );
  if (error?.response.statusCode === 401)
    throw new UnauthorizedException(error.response.message);

  throw new InternalServerErrorException('Please, check server logs');
};
