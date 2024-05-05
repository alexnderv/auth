package io.mbicycle.review.backend.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Sort;

@Setter
@Getter
@NoArgsConstructor
public class PageDto {

  private List<UserSimpleDto> content;
  private int totalPages;
  private int totalElements;
  private int size;
  private boolean last;
  private boolean first;
  private Sort sort;

}
