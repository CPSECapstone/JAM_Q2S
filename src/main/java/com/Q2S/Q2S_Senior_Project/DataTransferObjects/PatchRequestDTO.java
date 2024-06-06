package com.Q2S.Q2S_Senior_Project.DataTransferObjects;

import com.github.fge.jsonpatch.JsonPatch;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PatchRequestDTO {
    private String flowchartId;
    private JsonPatch patchRequest;
}
